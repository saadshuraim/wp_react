const ReviewItem = ({ review }) => {
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
    
    return stars;
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`${review.userColor || 'bg-secondary'} text-white w-10 h-10 rounded-full flex items-center justify-center font-medium`}>
            {review.userImg}
          </div>
          <div className="ml-3">
            <h4 className="font-medium text-primary">{review.username}</h4>
            <p className="text-xs text-neutral-dark">{review.affiliation}</p>
          </div>
        </div>
        <div className="text-sm star-rating">
          {renderStars(review.rating)}
        </div>
      </div>
      <p className="mt-3 text-neutral-dark">
        {review.comment}
      </p>
      <p className="mt-2 text-xs text-neutral-dark">Posted on {review.date}</p>
    </div>
  );
};

export default ReviewItem;
