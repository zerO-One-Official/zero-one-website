import Styles from './Glitter.module.css';

function BottomGlitter({ text, className }) {
  return (
    <div className={Styles.heading}>
      <h1 className={`${Styles.headingText} ${className ? className : ''}`}>{text}</h1>
      <span />
      <span />
    </div>
  );
}

export default BottomGlitter;
