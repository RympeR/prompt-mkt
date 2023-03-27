import { NavLink } from 'react-router-dom';
import './index.scss';

export interface HeaderItemProps {
    title: string;
    link: string;
}
export function HeaderItem(props: HeaderItemProps) {
  return (
    <NavLink className='header-item' to={props.link}>
        {props.title}
    </NavLink>
  );
}
