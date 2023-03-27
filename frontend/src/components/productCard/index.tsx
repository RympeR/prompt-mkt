import { BootstrapIcon } from "../bootstrapIcon";
import "./index.scss";

export interface ProductCardProps {
  category: string;
  name: string;
  price: string;
  image: string;
}

export function ProductCard(props: ProductCardProps) {
  return (
    <article className="product-card" style={{ backgroundImage: props.image }}>
      <div className="category">{props.category}</div>
      <div className="title">
        <div className="name">{props.name}</div>
        <div className="price">
          <BootstrapIcon icon="bag" />
          <span>{props.price}$</span>
        </div>
      </div>
    </article>
  );
}
