import React, { useState } from 'react'
import { Link, LinkProps, useLocation} from 'react-router-dom';

interface PropTypes {
    style?: string;
    image: string;
    alt: string;
    child: string;
    arrow?: string;
    link?: string;
    visits?: number;
    pointerEvent?: string;
    action?: React.MouseEventHandler<HTMLAnchorElement>;
}

const SidebarOptions = (props: PropTypes) => {
  const location = useLocation();
  const active = location.pathname.split('/')[2]
  const [path] = useState<string>(active)

  const handleClick = (event: React.MouseEvent) => {
    if (props.link  === undefined) {
      event.preventDefault();
      return false;
    }
  };

  return (
    <Link to={"/dashboard/" + props.link} onClick={handleClick}><div 
    className={`flex gap-4 items-center py-4 px-7 ${props.pointerEvent} ${path === props.link ? 'bg-tint-pink rounded-full' : null}`}
    >
        <div>
            <img src={props.image} alt={props.alt}/>
        </div>
        <div className='flex justify-between items-center w-full'>
          <div className='flex gap-2 items-center' >
            <p>{props.child}</p>
            <p className='font-semibold'>{props.visits}</p>
          </div>
          <div className={`${props.style}`} >
            <img src={props.arrow} alt='arrow'></img>
          </div>
        </div>
    </div></Link>
  )
}

export default SidebarOptions