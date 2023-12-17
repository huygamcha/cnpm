import React from "react";
import PropTypes from "prop-types";

function Rating({stars, reviews}) {
    return (
        <div style={styles.container}>
            <span>
                <i
                    className={
                        stars >= 1
                            ? "fa-solid fa-star"
                            : stars >= 0.5
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    }
                ></i>
                <i
                    className={
                        stars >= 2
                            ? "fa-solid fa-star"
                            : stars >= 1.5
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    }
                ></i>
                <i
                    className={
                        stars >= 3
                            ? "fa-solid fa-star"
                            : stars >= 2.5
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    }
                ></i>
                <i
                    className={
                        stars >= 4
                            ? "fa-solid fa-star"
                            : stars >= 3.5
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    }
                ></i>
                <i
                    className={
                        stars >= 5
                            ? "fa-solid fa-star"
                            : stars >= 4.5
                            ? "fa-solid fa-star-half-stroke"
                            : "fa-regular fa-star"
                    }
                ></i>
            </span>
            <span>{reviews && reviews + " reviews"} </span>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
    },
};

Rating.prototype = {
    stars: PropTypes.number.isRequired,
    reviews: PropTypes.string.isRequired,
};

export default Rating;
