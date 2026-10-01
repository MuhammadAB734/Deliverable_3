const { pool } = require('../config/db');

async function findCircleById(circleId) {
  const [rows] = await pool.execute(
    `SELECT circle_id, name, contribution_amount, contact_email
     FROM circles
     WHERE circle_id = ?`,
    [circleId]
  );
  return rows[0] || null;
}

async function findMembersByCircleId(circleId) {
  const [rows] = await pool.execute(
    `SELECT
       m.member_id,
       m.full_name,
       m.phone,
       m.email,
       m.account_status,
       ms.membership_id,
       ms.rotation_position,
       ms.status AS membership_status
     FROM memberships ms
     INNER JOIN members m ON m.member_id = ms.member_id
     WHERE ms.circle_id = ?
     ORDER BY ms.rotation_position ASC`,
    [circleId]
  );
  return rows;
}

async function findCyclesByCircleId(circleId) {
  const [rows] = await pool.execute(
    `SELECT
       cy.cycle_id,
       cy.cycle_number,
       c.circle_id,
       c.name AS circle_name,
       c.contribution_amount,
       COUNT(DISTINCT co.contribution_id) AS contributions_recorded,
       COALESCE(SUM(co.amount), 0.00) AS pool_collected,
       p.payout_id,
       p.amount AS payout_amount,
       p.payout_date,
       p.payout_status,
       payout_member.member_id AS payout_member_id,
       payout_member.full_name AS payout_recipient,
       payout_ms.rotation_position AS payout_rotation_position
     FROM cycles cy
     INNER JOIN circles c ON c.circle_id = cy.circle_id
     LEFT JOIN contributions co ON co.cycle_id = cy.cycle_id
     LEFT JOIN payouts p ON p.cycle_id = cy.cycle_id
     LEFT JOIN memberships payout_ms ON payout_ms.membership_id = p.membership_id
     LEFT JOIN members payout_member ON payout_member.member_id = payout_ms.member_id
     WHERE cy.circle_id = ?
     GROUP BY
       cy.cycle_id,
       cy.cycle_number,
       c.circle_id,
       c.name,
       c.contribution_amount,
       p.payout_id,
       p.amount,
       p.payout_date,
       p.payout_status,
       payout_member.member_id,
       payout_member.full_name,
       payout_ms.rotation_position
     ORDER BY cy.cycle_number ASC`,
    [circleId]
  );
  return rows;
}

module.exports = {
  findCircleById,
  findMembersByCircleId,
  findCyclesByCircleId
};
