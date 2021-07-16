import React, { Component } from "react";
import axios from "axios";
import CustomizedCard from "./CustomizedCard";
import ProductCard from "./ProductCard";
import {SetViewingProduct} from "../utils/LocalStorage";
import history from "../utils/History";
import {Grid} from "@material-ui/core";

export default class InfiniteProductCardList extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            loading: false,
            page: 0,
            prevY: 0
        };
    }

    componentDidMount() {
        this.getPhotos(this.state.page);

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getPhotos(page) {
        this.setState({ loading: true });
        axios
            .get(
                `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=12`
            )
            .then(res => {
                this.setState({ photos: [...this.state.photos, ...res.data] });
                this.setState({ loading: false });
            });
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastPhoto = this.state.photos[this.state.photos.length - 1];
            const curPage = lastPhoto.albumId;
            this.getPhotos(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    handleCardClick(product)
    {
        SetViewingProduct(JSON.stringify(product));
        history.push("/detail");
    }

    render() {

        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div className="container">
                <Grid container style={{ minHeight: "800px" }}>
                    {this.state.photos.map(item => (
                        <Grid item xs={3} key={item.id}>
                            <CustomizedCard
                                cardContent={<ProductCard
                                    imageUrl={item.url}
                                    key={item.id}
                                    title={item.title}
                                    subtitle={item.albumId}
                                    handleCardClick={() => {
                                        this.handleCardClick(item)
                                    }}
                                />}
                                cardAction={""}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );
    }
}