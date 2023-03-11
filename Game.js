import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import RandomNumber from "./RandomNumber.js";
import shuffle from "lodash.shuffle";

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
    };
    state = {
        selectedNumbers: [],
        remainingSeconds: this.props.initialSeconds,
    };
gameStatus = "PLAYING";

shuffleRandomNumbers
 = Array
    .from({ length: this.props.randomNumberCount })
    .map(() => 1 + Math.floor(Math.random() * 10));
target = this.shuffleRandomNumbers
.slice(0, this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
shuffleshuffleRandomNumbers
 = shuffle(this.shuffleRandomNumbers
  );
componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
            return { remainingSeconds: prevState.remainingSeconds - 1 };
        }, () => {
            if (this.state.remainingSeconds === 0) {
                clearInterval(this.intervalId);
            }
        });
    }, 1000);
}

componentWillUnmount() {
    clearInterval(this.intervalId);
}

isNumberSelected = (numberIndex) => {
    return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
};
selectNumber = (numberIndex) => {
    this.setState((prevState) => {
        return { selectedNumbers: [...prevState.selectedNumbers, numberIndex] };    });
};
componentWillUpdate(nextProps, nextState) {
    if (nextState.selectedNumbers !== this.state.selectedNumbers || nextState.remainingSeconds === 0) {
        this.gameStatus = this.calcGameStatus(nextState);
        if (this.gameStatus !== "PLAYING") {
            clearInterval(this.intervalId);
        }

    }
};
calcGameStatus = (nextState) => {

      const sumSelected = nextState.selectedNumbers.reduce((acc, curr) => acc + this.shuffleRandomNumbers
      [curr], 0);
      if (nextState.remainingSeconds === 0) {
          return "LOST";
      }
      if (sumSelected < this.target) {
          return "PLAYING";
      }
      if (sumSelected === this.target) {
          return "WON";
      }
      if (sumSelected > this.target) {
          return "LOST";
      }
  };



  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target,styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
        {this.shuffleRandomNumbers
        .map((randomNumber, index) =>
        <RandomNumber key={index} id={index} number={randomNumber} 
        isDisabled={this.isNumberSelected(index) || gameStatus !== "PLAYING"}
        onPress={this.selectNumber}
        componentDidMount={this.componentDidMount}
        />




        )}
      

      </View>
      {this.gameStatus !== "PLAYING" && (
      <Button title="Play Again" onPress={this.props.onPlayAgain} />
      )}
      
      <Text>{this.state.remainingSeconds}</Text>
        </View>

    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  target: {
    fontSize: 50,
    backgroundColor: "#bbb",
    margin: 50,
    textAlign: "center",
    },
    randomContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    STATUS_PLAYING: {
        backgroundColor: "#bbb",
    },
    STATUS_WON: {
        backgroundColor: "green",
    },
    STATUS_LOST: {
        backgroundColor: "red",
    },



});

export default Game;