export default function Container({ children }) {
  return (
    <div>
      <h1 className="card2">Apotek Kita</h1>
      {children}
      <br />
      <footer>
        <p>2025 - Politeknik Caltex Riau</p>
      </footer>
    </div>
  );
}
