// Load dashboard stats when the page loads
document.addEventListener('DOMContentLoaded', function () {
  auth.checkAuth('admin');
  fetchStats();
});

// Fetch and display stats in the dashboard cards
async function fetchStats() {
  try {
    var stats = await db.getStats();
    document.getElementById('total-courts').textContent = stats.totalCourts;
    document.getElementById('active-courts').textContent = stats.activeCourts;
    document.getElementById('today-bookings').textContent = stats.todayBookings;
    document.getElementById('total-members').textContent = stats.totalMembers;
    document.getElementById('total-earned').textContent = 'EGP ' + stats.totalEarned;
    document.getElementById('cash-due').textContent = 'EGP ' + stats.cashDue;
    document.getElementById('cancelled-count').textContent = stats.cancelledCount;
    document.getElementById('expected-revenue').textContent = 'EGP ' + stats.expectedRevenue;
    document.getElementById('refund-total').textContent = 'EGP ' + stats.refundTotal;
  } catch (error) {
    auth.showToast('Failed to load dashboard stats', 'error');
  }
}
