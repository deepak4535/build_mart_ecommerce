
function CategoryCard(props) {
  return (
    <div className="category-card">
      <div className="category-image">{props.image}</div>

      <h3>{props.name}</h3>

      <p>{props.description}</p>
    </div>
  );
}

export default CategoryCard;