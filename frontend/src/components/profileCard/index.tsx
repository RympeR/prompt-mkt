import { BootstrapIcon } from "../bootstrapIcon";
import "./index.scss";

export interface ProfileCardProps {
  name: string;
  views: number;
  image?: string;
  itemsCount: number;
}

export function ProfileCard(props: ProfileCardProps) {
  return (
    <article className="profile-card" style={{ backgroundImage: props.image }}>
      <div className="category">
        <BootstrapIcon icon="eye" />
        <span>{props.views}</span>
      </div>
      <div className="title">
        <div className="name">{props.name}</div>
        <div className="itemsCount">
          <BootstrapIcon icon="tag" />
          <span>{props.itemsCount}</span>
        </div>
      </div>
    </article>
  );
}
