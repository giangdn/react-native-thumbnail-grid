import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import _ from "lodash";
import ImageLoad from "react-native-image-placeholder";

const { width } = Dimensions.get("window");

class PhotoGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      width: props.width,
      height: props.height
    };
  }

  static defaultProps = {
    numberImagesToShow: 0,
    onPressImage: () => {}
  };

  isLastImage = (index, secondViewImages) => {
    const { source, numberImagesToShow } = this.props;

    return (
      (source.length > 5 || numberImagesToShow) &&
      (typeof secondViewImages === "object" &&
        index === secondViewImages.length - 1)
    );
  };

  handlePressImage = (event, { image, index }, secondViewImages) =>
    this.props.onPressImage(
      event,
      { image, index },
      {
        isLastImage: index && this.isLastImage(index, secondViewImages)
      }
    );

  render() {
    const { imageProps } = this.props;
    const source = _.take(this.props.source, 5);
    const firstViewImages = [];
    const secondViewImages = [];
    const firstItemCount = source.length === 5 ? 2 : 1;
    let index = 0;
    _.each(source, (img, callback) => {
      if (index === 0) {
        firstViewImages.push(img);
      } else if (index === 1 && firstItemCount === 2) {
        firstViewImages.push(img);
      } else {
        secondViewImages.push(img);
      }
      index++;
    });

    const { width, height } = this.props;
    let ratio = 0;
    if (secondViewImages.length === 0) {
      ratio = 0;
    } else if (secondViewImages.length === 1) {
      ratio = 1 / 2;
    } else {
      ratio = this.props.ratio;
    }
    const direction = source.length === 5 ? "row" : "column";

    const firstImageWidth =
      direction === "column"
        ? (width - firstViewImages.length * 8) / firstViewImages.length
        : (width - 8) * (1 - ratio);
    const firstImageHeight =
      direction === "column"
        ? (height - 8) * (1 - ratio)
        : (height - firstViewImages.length * 8) / firstViewImages.length;

    const secondImageWidth =
      direction === "column"
        ? (width - 8) / secondViewImages.length
        : (width - 8) * ratio;
    const secondImageHeight =
      direction === "column"
        ? (height - 8) / secondViewImages.length
        : (height - 8) * ratio;

    const secondViewWidth =
      direction === "column" ? width - 8 : (width - 8) * ratio;
    const secondViewHeight =
      direction === "column" ? (height - ratio * 8) * ratio : height - 8;

    return source.length ? (
      <View
        style={[
          {
            flexDirection: direction,
            width: width - 8,
            height: height - 8,
            margin: 4
          },
          this.props.styles
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: direction === "row" ? "column" : "row"
          }}
        >
          {firstViewImages.map((image, index) => {
            let overlay = null;
            if (
              typeof image === "object" &&
              typeof image.overlay !== undefined
            ) {
              overlay = image.overlay;
              image = image.source;
            }

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                style={{ flex: 1 }}
                onPress={event =>
                  this.handlePressImage(event, { image, index })
                }
              >
                <ImageLoad
                  style={[
                    styles.image,
                    {
                      width: firstImageWidth - 8,
                      height: firstImageHeight
                    },
                    this.props.imageStyle
                  ]}
                  source={typeof image === "string" ? { uri: image } : image}
                  {...imageProps}
                />
                {overlay !== null && overlay}
              </TouchableOpacity>
            );
          })}
        </View>
        {secondViewImages.length ? (
          <View
            style={{
              width: secondViewWidth,
              height: secondViewHeight,
              flexDirection: direction === "row" ? "column" : "row"
            }}
          >
            {secondViewImages.map((image, index) => {
              let overlay = null;
              if (
                typeof image === "object" &&
                typeof image.overlay !== undefined
              ) {
                overlay = image.overlay;
                image = image.source;
              }
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  style={{ flex: 1 }}
                  onPress={event => {
                    let trueIndex = firstViewImages.length + index;
                    return this.handlePressImage(
                      event,
                      { image, index: trueIndex },
                      secondViewImages
                    );
                  }}
                >
                  {this.isLastImage(index, secondViewImages) ? (
                    <ImageBackground
                      style={[
                        styles.image,
                        {
                          width: secondImageWidth - 8,
                          height: secondImageHeight
                        },
                        this.props.imageStyle
                      ]}
                      source={
                        typeof image === "string" ? { uri: image } : image
                      }
                    >
                      <View style={styles.lastWrapper}>
                        <Text style={[styles.textCount, this.props.textStyles]}>
                          +
                          {this.props.numberImagesToShow ||
                            this.props.source.length - 5}
                        </Text>
                      </View>
                    </ImageBackground>
                  ) : (
                    <ImageLoad
                      style={[
                        styles.image,
                        {
                          width: secondImageWidth - 8,
                          height: secondImageHeight
                        },
                        this.props.imageStyle
                      ]}
                      source={
                        typeof image === "string" ? { uri: image } : image
                      }
                      {...imageProps}
                    />
                  )}
                  {overlay !== null && overlay}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </View>
    ) : null;
  }
}

PhotoGrid.prototypes = {
  source: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  onPressImage: PropTypes.func,
  ratio: PropTypes.float,
  imageProps: PropTypes.object
};

PhotoGrid.defaultProps = {
  style: {},
  imageStyle: {},
  imageProps: {},
  width: width,
  height: 400,
  ratio: 1 / 3
};

const styles = {
  image: {
    flex: 1,
    margin: 4,
    borderColor: "#fff",
    borderRadius: 6,
    overflow: "hidden"
  },
  lastWrapper: {
    flex: 1,
    backgroundColor: "rgba(200, 200, 200, .5)",
    justifyContent: "center",
    alignItems: "center"
  },
  textCount: {
    color: "#fff",
    fontSize: 60
  }
};

export default PhotoGrid;
