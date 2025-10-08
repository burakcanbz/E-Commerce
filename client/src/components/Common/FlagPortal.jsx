import ReactDOM from 'react-dom';

const FlagPortal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className='d-none d-xxl-block'>
      {children}
    </div>,
    document.getElementById('flag-root')
  )
}

export default FlagPortal
