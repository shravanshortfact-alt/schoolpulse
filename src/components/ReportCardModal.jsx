import React from 'react';
import { X, Printer, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function ReportCardModal({ isOpen, onClose, reportCard, schoolInfo }) {
  if (!isOpen || !reportCard) return null;

  const school = schoolInfo || {
    name: 'P.N. National Public School',
    tagline: 'Affiliated to CBSE Delhi 10+2 (Affiliation No. 2131645)',
    logo: '/pn_logo.png'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '780px', padding: '0', background: '#0F172A' }}>
        {/* Header Actions Bar */}
        <div style={{
          padding: '14px 24px',
          background: 'rgba(15, 23, 42, 0.9)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--color-accent-amber)" />
            <h3 style={{ fontSize: '1.1rem' }}>CBSE Digital Progress Report Card</h3>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)', padding: '4px' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Report Card Sheet Body */}
        <div id="printable-report-card" style={{ padding: '28px', background: '#0B0F19', color: '#F8FAFC' }}>
          {/* School Header Seal */}
          <div style={{
            textAlign: 'center',
            borderBottom: '2px double rgba(255,255,255,0.15)',
            paddingBottom: '20px',
            marginBottom: '20px'
          }}>
            <img src={school.logo} alt={school.name} style={{ height: '60px', marginBottom: '8px', objectFit: 'contain' }} />
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{school.name}</h1>
            <p style={{ fontSize: '0.82rem', color: '#FBBF24', fontWeight: 600 }}>{school.tagline}</p>
            <div style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '4px 14px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-accent-indigo)'
            }}>
              ACADEMIC PERFORMANCE STATEMENT — {reportCard.term}
            </div>
          </div>

          {/* Student Info Box */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Student Name</div>
              <strong style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>{reportCard.studentName}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Roll No / Admission ID</div>
              <strong style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>{reportCard.rollNo}</strong>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Class & Section</div>
              <strong>Class {reportCard.classId} (Science)</strong>
            </div>
            <div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Academic Session</div>
              <strong>{reportCard.academicYear}</strong>
            </div>
          </div>

          {/* Marks Table */}
          <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(15, 23, 42, 0.9)', borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '10px 12px' }}>Code</th>
                  <th style={{ padding: '10px 12px' }}>Subject Name</th>
                  <th style={{ padding: '10px 12px' }}>Max Marks</th>
                  <th style={{ padding: '10px 12px' }}>Marks Obtained</th>
                  <th style={{ padding: '10px 12px' }}>Grade</th>
                  <th style={{ padding: '10px 12px' }}>Teacher Remarks</th>
                </tr>
              </thead>
              <tbody>
                {reportCard.subjects.map((sub) => (
                  <tr key={sub.code} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{sub.code}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{sub.name}</td>
                    <td style={{ padding: '10px 12px' }}>{sub.maxMarks}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--color-accent-indigo)' }}>{sub.marksObtained}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className="badge badge-success">{sub.grade}</span>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{sub.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aggregate Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Total Score</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{reportCard.totalObtained} / {reportCard.totalMax}</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-indigo)' }}>Percentage</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent-indigo)' }}>{reportCard.percentage}%</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#34D399' }}>Class Rank</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399' }}>{reportCard.rankInClass}</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: '#FBBF24' }}>Final Result</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#FBBF24' }}>{reportCard.result}</div>
            </div>
          </div>

          {/* Remarks & Signatures Footer */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            marginBottom: '20px',
            fontSize: '0.85rem'
          }}>
            <strong style={{ color: 'var(--color-text-primary)' }}>Class Teacher's Remarks: </strong>
            <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '4px' }}>
              "{reportCard.teacherRemarks}"
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingTop: '20px',
            borderTop: '1px dashed var(--color-border)'
          }}>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Mrs. Priya Verma</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class Teacher (12-A)</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                border: '2px solid #FBBF24',
                color: '#FBBF24',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                marginBottom: '4px'
              }}>
                SEAL OF PRINCIPAL • PNNPS
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Dr. Anil Singh</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Principal & Academic Director</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
