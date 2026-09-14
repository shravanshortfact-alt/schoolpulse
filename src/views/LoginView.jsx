import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles,
  KeyRound
} from 'lucide-react';
import { storageService } from '../services/storageService';

export default function LoginView({ state, onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('student');
  const [username, setUsername] = useState('1201');
  const [password, setPassword] = useState('123');
  const [errorMsg, setErrorMsg] = useState('');

  const school = state.schoolInfo || {
    name: 'P.N. National Public School',
    tagline: 'Affiliated to CBSE Delhi 10+2 (Affiliation No. 2131645)',
    motto: 'तमसो मा ज्योतिर्गमय',
    logo: '/pn_logo.png'
  };

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    // Auto preset demo credentials for convenience
    switch (role) {
      case 'student':
        setUsername('1201');
        setPassword('123');
        break;
      case 'parent':
        setUsername('9876543210');
        setPassword('123');
        break;
      case 'teacher':
        setUsername('teacher');
        setPassword('123');
        break;
      case 'principal':
        setUsername('admin');
        setPassword('123');
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const foundUser = state.demoUsers.find(
      u => u.role === selectedRole && u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (foundUser && (password === foundUser.password || password === '123')) {
      storageService.setActiveUser(foundUser);
      if (onLoginSuccess) onLoginSuccess(foundUser);
    } else {
      setErrorMsg('Invalid Credentials. Please use the Quick Fill demo buttons below.');
    }
  };

  const handleQuickFill = (user) => {
    setSelectedRole(user.role);
    setUsername(user.username);
    setPassword(user.password || '123');
    storageService.setActiveUser(user);
    if (onLoginSuccess) onLoginSuccess(user);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 20px',
      background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0B0F19 85%)'
    }}>
      <div style={{ maxWidth: '960px', width: '100%' }}>
        {/* School Header Banner */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src={school.logo}
            alt={school.name}
            style={{
              height: '80px',
              maxWidth: '340px',
              objectFit: 'contain',
              marginBottom: '12px',
              filter: 'drop-shadow(0 4px 12px rgba(99, 102, 241, 0.4))'
            }}
          />
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {school.name}
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#FBBF24', fontWeight: 600, marginTop: '2px' }}>
            "{school.motto}"
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {school.tagline}
          </p>
        </div>

        {/* Login Box Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Main Login Form */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--color-text-primary)' }}>
              Portal Sign In
            </h2>

            {/* Role Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px'
            }}>
              {[
                { role: 'student', label: 'Student', icon: GraduationCap },
                { role: 'parent', label: 'Parent', icon: Users },
                { role: 'teacher', label: 'Teacher', icon: UserCheck },
                { role: 'principal', label: 'Admin', icon: ShieldCheck }
              ].map(item => {
                const Icon = item.icon;
                const isActive = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleTabChange(item.role)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--gradient-brand)' : 'transparent',
                      color: isActive ? '#FFF' : 'var(--color-text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.78rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#F87171',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">
                  {selectedRole === 'student' ? 'Roll No / User ID' : selectedRole === 'parent' ? 'Registered Mobile Number' : 'Employee Username'}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter ID"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="password"
                    className="form-input"
                    style={{ paddingLeft: '38px' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px', fontSize: '0.95rem' }}>
                <span>Sign In to {selectedRole.toUpperCase()} Portal</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Presentation Quick Fill Demo Shortcuts */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <KeyRound size={18} color="var(--color-accent-amber)" />
              <h3 style={{ fontSize: '1.05rem' }}>1-Click Presentation Demo Login</h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Select a persona below to instantly authenticate into their isolated role view:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {state.demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleQuickFill(user)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'left',
                    transition: 'var(--transition-fast)'
                  }}
                  className="glass-card-hover"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {user.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>
                        {user.role} ({user.details})
                      </div>
                    </div>
                  </div>

                  <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
                    Log In
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
