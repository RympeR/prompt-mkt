import './index.scss';

export interface HeaderItemProps {
    title: string;
    link: string;
}
export function HeaderItem(props: HeaderItemProps) {
  return (
    <a className='header-item' href={props.link}>
        {props.title}
    </a>
  );
}
