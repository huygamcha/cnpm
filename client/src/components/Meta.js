import {Helmet} from "react-helmet";
import React from "react";

function Meta({title, description, keyword}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keyword} />
        </Helmet>
    );
}

Meta.defaultProps = {
    title: "Welcome to Roserade Shop",
    keyword: "clothes, fashion",
    description: "we sell fashion clothes for a reasonable price",
};

export default Meta;
