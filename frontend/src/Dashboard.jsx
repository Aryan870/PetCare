import React, { useState } from 'react';

const Dashboard = ({ userType, onLogout }) => {
  const [currentSection, setCurrentSection] = useState('onboarding');

  const renderSection = () => {
    switch (currentSection) {
      case 'onboarding':
        return (
          <div>
            <h2>Onboarding - Add Pet Profile</h2>
            <p>Form to add pet profile will go here.</p>
          </div>
        );
      case 'userDashboard':
        return (
          <div>
            <h2>User Dashboard</h2>
            <p>Main user dashboard content.</p>
          </div>
        );
      case 'consultationType':
        return null;
      case 'inPerson':
        return (
          <div>
            <h2>In-Person Consultation</h2>
            <p>Filter by Location and book slot.</p>
          </div>
        );
      case 'virtual':
        return (
          <div>
            <h2>Virtual Consultation</h2>
            <p>Filter by Specialty & Rating and book slot.</p>
          </div>
        );
      case 'adminDashboard':
        return (
          <div>
            <h2>Admin Dashboard & Analytics</h2>
            <button onClick={() => setCurrentSection('manageAppointments')}>Manage Appointments</button>
            <button onClick={() => setCurrentSection('usageMetrics')}>Usage Metrics</button>
            <button onClick={() => setCurrentSection('exportReports')}>Export Reports</button>
          </div>
        );
      case 'manageAppointments':
        return (
          <div>
            <h2>Manage Appointments</h2>
            <p>Appointment management interface.</p>
          </div>
        );
      case 'usageMetrics':
        return (
          <div>
            <h2>Usage Metrics</h2>
            <p>Analytics and usage data.</p>
          </div>
        );
      case 'exportReports':
        return (
          <div>
            <h2>Export Reports</h2>
            <p>Export reports interface.</p>
          </div>
        );
      default:
        return <p>Select a section from the menu.</p>;
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#4a90e2',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontWeight: '600',
        fontSize: '1rem',
      }}>
        <button
          onClick={() => setCurrentSection('onboarding')}
          style={{
            marginRight: '1.5rem',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#357ABD'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Onboarding
        </button>
        <button
          onClick={() => setCurrentSection('userDashboard')}
          style={{
            marginRight: '1.5rem',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#357ABD'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          User Dashboard
        </button>
        <select
          onChange={(e) => setCurrentSection(e.target.value)}
          defaultValue="consultationType"
          style={{
            marginRight: '1.5rem',
            cursor: 'pointer',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            border: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            color: 'white',
            backgroundColor: '#4a90e2',
            transition: 'box-shadow 0.3s ease',
          }}
          onFocus={e => e.currentTarget.style.boxShadow = '0 0 5px #357ABD'}
          onBlur={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <option value="consultationType" disabled style={{ color: 'white', backgroundColor: '#4a90e2' }}>Consultation Type</option>
          <option value="inPerson" style={{ color: 'white', backgroundColor: '#4a90e2' }}>In-Person</option>
          <option value="virtual" style={{ color: 'white', backgroundColor: '#4a90e2' }}>Virtual</option>
        </select>
        {userType === 'doctor' && (
          <>
            <button
              onClick={() => setCurrentSection('adminDashboard')}
              style={{
                marginRight: '1.5rem',
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#357ABD'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Admin Dashboard &amp; Analytics
            </button>
          </>
        )}
        <button
          onClick={onLogout}
          style={{
            marginLeft: 'auto',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D9534F'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Logout
        </button>
      </nav>
      <div style={{ paddingTop: '70px', padding: '2rem', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        <h1>Welcome to Online Petcare & Consultation</h1>
        <p>You are logged in as: <strong>{userType === 'owner' ? 'Pet Owner' : 'Doctor'}</strong></p>
        <section>
          {renderSection()}
        </section>
      </div>
    </>
  );
};

export default Dashboard;
