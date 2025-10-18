// src/components/ui/ErrorMessage.tsx
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div role="alert" style={{ color: 'crimson', padding: '0.75rem 1rem' }}>
      {message}
    </div>
  );
}
