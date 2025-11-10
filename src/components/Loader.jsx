import './Loader.css'

function Loader({ isLoading }) {
  return (
    <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
      <div className="loader__spinner"></div>
    </div>
  )
}

export default Loader

