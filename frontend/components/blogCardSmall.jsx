// components/BlogCardSmall.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const BlogCardSmall = ({ title, date, content }) => {
  return (
    <div className="max-w-full overflow-hidden flex" style={{backgroundImage: 'url("blogb.svg")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
      <div className="flex flex-col justify-center w-full p-5rem ">
        <div className="body-bold">{title}</div>
        <div className="text-green-500 text-sm font-bold"><FontAwesomeIcon icon={faClock} /> Posted on <span className="text-gray-600">{date}</span></div>
        <p className="body-small">
          {content}
        </p>
      </div>
    </div>
  );
};

export default BlogCardSmall;
