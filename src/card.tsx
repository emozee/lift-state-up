import React from 'react';

// This is what was missing! 
// It tells TypeScript exactly what "CardProps" is allowed to contain.
export interface CardProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties; // This allows the custom styles (like the yellow border)
}

export function Card({ title, children, style }: CardProps) {
  return (
    <div 
      className="custom-card"
      style={{ 
        width: '320px',
        minHeight: '400px', 
        padding: '30px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style // Merges standard styles with WarningCard's yellow border
      }}
    >
      <div style={{ flex: 1 }}>
        {title && <h3 style={{ fontSize: '1rem', marginBottom: '20px', color: '#333' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}