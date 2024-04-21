import React from 'react';

const AdminHomePage = () => {
  return (
    <div className="admin-home-page">
      <h1>Admin Dashboard</h1>

      <div className="summary-cards">
        <SummaryCard title="Users" value={100} icon="fa fa-users" />
        <SummaryCard title="Courses" value={20} icon="fa fa-book" />
        <SummaryCard title="Batches" value={5} icon="fa fa-calendar" />
        <SummaryCard title="Transactions" value="$1,500" icon="fa fa-money-bill-alt" />
      </div>

      <div className="recent-activity"> 
        <h2>Recent Activity</h2>
        <ul>
          <li>John Doe created a new account.</li>
          <li>Jane Smith enrolled in the Java course.</li>
          <li>A new batch for Python is created.</li>
          <li>A payment of $200 is received from Michael.</li>
        </ul>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <ul>
          <li><a href="/admin/users">Manage Users</a></li>
          <li><a href="/admin/courses">Create New Course</a></li>
          <li><a href="/admin/batches">View All Batches</a></li>
          <li><a href="/admin/reports">Generate Reports</a></li>
        </ul>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => (
  <div className="summary-card">
    <i className={icon}></i>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default AdminHomePage;
