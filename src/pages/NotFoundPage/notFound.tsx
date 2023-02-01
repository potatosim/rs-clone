import ghostImg from './not-found-ghost.png';
import style from './NotFound.module.css';

const NotFound = () => {
  return (
    <>
      <div className={style.content}>
        <div className={style.message}>
          <h4>Error 404</h4>
          <p>Sorry, we can't find that page. Don't worry though, everything is still awesome!</p>
          <button className={style.btnHome}> Go Home</button>
        </div>
        <div className={style.ghost_block}>
          <img className={style.ghost} src={ghostImg} alt="ghost image" />
        </div>
      </div>
    </>
  );
};

export default NotFound;
