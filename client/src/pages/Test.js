import Carousel from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import CustomizedCard from "../components/CustomizedCard";
import React from "react";
import {Grid} from "@material-ui/core";

export default function Test(){
    return(
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable
        >
            <Grid item key={0}>
                <CustomizedCard
                    cardContent={<ProductCard
                        imageUrl={""}
                        key={0}
                        title={"testwithgriditem"}
                        subtitle={"testing"}
                        handleCardClick={() => {}}
                    ></ProductCard>}
                    cardAction={""}
                />
            </Grid>
            <CustomizedCard
                cardContent={<ProductCard
                    imageUrl={""}
                    key={1}
                    title={"test"}
                    subtitle={"testing"}
                    handleCardClick={() => {}}
                ></ProductCard>}
                cardAction={""}
            />
            <CustomizedCard
                cardContent={<ProductCard
                    imageUrl={""}
                    key={2}
                    title={"test"}
                    subtitle={"testing"}
                    handleCardClick={() => {}}
                ></ProductCard>}
                cardAction={""}
            />
            <CustomizedCard
                cardContent={<ProductCard
                    imageUrl={""}
                    key={3}
                    title={"test"}
                    subtitle={"testing"}
                    handleCardClick={() => {}}
                ></ProductCard>}
                cardAction={""}
            />
        </Carousel>
    );
}