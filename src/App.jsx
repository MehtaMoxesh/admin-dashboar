import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'todo', priority: 'high' },
    { id: 2, title: 'Task 2', status: 'progress', priority: 'medium' },
    { id: 3, title: 'Task 3', status: 'done', priority: 'low' }
  ]);
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', date: '2025-06-10', time: '10:00' },
    { id: 2, title: 'Project Review', date: '2025-06-12', time: '14:00' }
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' }
  ]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const StatsCard = ({ title, value, color, icon }) => (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const Chart = () => {
    useEffect(() => {
      const canvas = document.getElementById('chart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple bar chart
        const data = [65, 45, 80, 35, 90, 60, 75];
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const maxValue = Math.max(...data);
        
        data.forEach((value, index) => {
          const barHeight = (value / maxValue) * 150;
          const x = index * 40 + 20;
          const y = 170 - barHeight;
          
          ctx.fillStyle = '#2563eb';
          ctx.fillRect(x, y, 30, barHeight);
          
          ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(labels[index], x + 15, 190);
          ctx.fillText(value, x + 15, y - 5);
        });
      }
    }, [theme]);

    return <canvas id="chart" width="300" height="200"></canvas>;
  };

  const Dashboard = () => (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <StatsCard title="Total Users" value="1,234" color="blue" icon="👥" />
        <StatsCard title="Revenue" value="$45,678" color="green" icon="💰" />
        <StatsCard title="Orders" value="789" color="orange" icon="📦" />
        <StatsCard title="Growth" value="12.5%" color="purple" icon="📈" />
      </div>
      
      <div className="chart-section">
        <h3>Weekly Analytics</h3>
        <Chart />
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-dot green"></span>
            <p>New user registered - 2 hours ago</p>
          </div>
          <div className="activity-item">
            <span className="activity-dot blue"></span>
            <p>Order #1234 completed - 4 hours ago</p>
          </div>
          <div className="activity-item">
            <span className="activity-dot orange"></span>
            <p>System backup completed - 6 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DataTable = () => (
    <div className="table-container">
      <h2>Users Management</h2>
      <div className="table-actions">
        <input type="text" placeholder="Search users..." className="search-input" />
        <button className="btn btn-primary">Add User</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
              <td><span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></td>
              <td>
                <button className="btn btn-sm">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const Calendar = () => {
    const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '' });
    const [showModal, setShowModal] = useState(false);

    const handleAddEvent = () => {
      if (newEvent.title && newEvent.date && newEvent.time) {
        addEvent(newEvent);
        setNewEvent({ title: '', date: '', time: '' });
        setShowModal(false);
      }
    };

    return (
      <div className="calendar-container">
        <h2>Calendar</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Event
        </button>
        
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h4>{event.title}</h4>
              <p>📅 {event.date}</p>
              <p>🕒 {event.time}</p>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3>Add New Event</h3>
              <div>
                <input
                  type="text"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                />
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                />
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                />
                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)}>Cancel</button>
                  <button onClick={handleAddEvent} className="btn btn-primary">Add Event</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const KanbanBoard = () => {
    const columns = ['todo', 'progress', 'done'];
    const columnTitles = { todo: 'To Do', progress: 'In Progress', done: 'Done' };

    return (
      <div className="kanban-container">
        <h2>Project Board</h2>
        <div className="kanban-board">
          {columns.map(column => (
            <div key={column} className="kanban-column">
              <h3>{columnTitles[column]}</h3>
              <div className="tasks-list">
                {tasks.filter(task => task.status === column).map(task => (
                  <div key={task.id} className="task-card" draggable>
                    <h4>{task.title}</h4>
                    <span className={`priority ${task.priority}`}>{task.priority}</span>
                    <div className="task-actions">
                      {column !== 'todo' && (
                        <button onClick={() => moveTask(task.id, columns[columns.indexOf(column) - 1])}>
                          ←
                        </button>
                      )}
                      {column !== 'done' && (
                        <button onClick={() => moveTask(task.id, columns[columns.indexOf(column) + 1])}>
                          →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tables': return <DataTable />;
      case 'calendar': return <Calendar />;
      case 'kanban': return <KanbanBoard />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`admin-dashboard ${theme}`}>
      <style>{`
        .admin-dashboard {
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: ${theme === 'dark' ? '#1a1a1a' : '#f5f5f5'};
          color: ${theme === 'dark' ? '#fff' : '#333'};
        }

        .header {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .logo h1 {
          color: #2563eb;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .theme-toggle {
          background: none;
          border: 2px solid #2563eb;
          color: #2563eb;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .theme-toggle:hover {
          background: #2563eb;
          color: white;
        }

        .main-container {
          display: flex;
        }

        .sidebar {
          width: 250px;
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          min-height: calc(100vh - 80px);
          padding: 2rem 0;
          box-shadow: 2px 0 4px rgba(0,0,0,0.1);
        }

        .nav-item {
          display: block;
          padding: 1rem 2rem;
          color: ${theme === 'dark' ? '#ccc' : '#666'};
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 1rem;
        }

        .nav-item:hover, .nav-item.active {
          background: #2563eb;
          color: white;
        }

        .content {
          flex: 1;
          padding: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stats-card {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }

        .stats-card:hover {
          transform: translateY(-5px);
        }

        .stats-icon {
          font-size: 2rem;
          margin-right: 1rem;
        }

        .stats-content h3 {
          font-size: 2rem;
          margin: 0;
          color: #2563eb;
        }

        .stats-content p {
          margin: 0.5rem 0 0 0;
          color: ${theme === 'dark' ? '#ccc' : '#666'};
        }

        .chart-section {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .chart-section h3 {
          margin-bottom: 1rem;
          color: #2563eb;
        }

        .recent-activity {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .recent-activity h3 {
          margin-bottom: 1rem;
          color: #2563eb;
        }

        .activity-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${theme === 'dark' ? '#444' : '#eee'};
        }

        .activity-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 1rem;
        }

        .activity-dot.green { background: #10b981; }
        .activity-dot.blue { background: #2563eb; }
        .activity-dot.orange { background: #f59e0b; }

        .table-container {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .table-actions {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }

        .search-input {
          padding: 0.75rem;
          border: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
          border-radius: 6px;
          background: ${theme === 'dark' ? '#1a1a1a' : '#fff'};
          color: ${theme === 'dark' ? '#fff' : '#333'};
          flex: 1;
          max-width: 300px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid ${theme === 'dark' ? '#444' : '#eee'};
        }

        .data-table th {
          background: ${theme === 'dark' ? '#1a1a1a' : '#f8f9fa'};
          font-weight: 600;
          color: #2563eb;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .badge.admin { background: #fef3c7; color: #92400e; }
        .badge.user { background: #dbeafe; color: #1e40af; }
        .badge.manager { background: #d1fae5; color: #065f46; }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status.active { background: #d1fae5; color: #065f46; }
        .status.inactive { background: #fecaca; color: #991b1b; }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: #2563eb;
          color: white;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          background: ${theme === 'dark' ? '#444' : '#f3f4f6'};
          color: ${theme === 'dark' ? '#fff' : '#374151'};
        }

        .btn-danger {
          background: #ef4444;
          color: white;
        }

        .calendar-container {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .events-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .event-card {
          background: ${theme === 'dark' ? '#1a1a1a' : '#f8f9fa'};
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #2563eb;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 2rem;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
        }

        .modal h3 {
          margin-bottom: 1.5rem;
          color: #2563eb;
        }

        .modal input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid ${theme === 'dark' ? '#444' : '#ddd'};
          border-radius: 6px;
          background: ${theme === 'dark' ? '#1a1a1a' : '#fff'};
          color: ${theme === 'dark' ? '#fff' : '#333'};
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .kanban-container {
          padding: 2rem;
        }

        .kanban-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .kanban-column {
          background: ${theme === 'dark' ? '#2d2d2d' : '#fff'};
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .kanban-column h3 {
          color: #2563eb;
          margin-bottom: 1rem;
          text-align: center;
        }

        .task-card {
          background: ${theme === 'dark' ? '#1a1a1a' : '#f8f9fa'};
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          cursor: move;
          transition: all 0.3s;
        }

        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .priority {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }

        .priority.high { background: #fecaca; color: #991b1b; }
        .priority.medium { background: #fef3c7; color: #92400e; }
        .priority.low { background: #d1fae5; color: #065f46; }

        .task-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .task-actions button {
          background: #2563eb;
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .main-container {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            min-height: auto;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .kanban-board {
            grid-template-columns: 1fr;
          }
          
          .table-actions {
            flex-direction: column;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Dark' : 'Light'}
          </button>
        </div>
      </header>

      <div className="main-container">
        <nav className="sidebar">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'tables' ? 'active' : ''}`}
            onClick={() => setActiveTab('tables')}
          >
            📋 Tables
          </button>
          <button 
            className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`nav-item ${activeTab === 'kanban' ? 'active' : ''}`}
            onClick={() => setActiveTab('kanban')}
          >
            📝 Kanban
          </button>
        </nav>

        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;