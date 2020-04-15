import React from 'react';
import {
  StyleSheet,
  Component,
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentplayer: 1,
      cntclick: 0,
      currentRow: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      cntWinPlayeer1: 0,
      cntWinPlayeer2: 0,
      cntStandoff: 0,
      cntGames: 0,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState = {
      cntclick: 0,
      cntGames: this.setState.cntGames++,
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };
  };

  checkWinner = () => {
    const NUM_TILE = 3;
    var arr = this.state.gameState;
    var sum = 0;
    this.setState = {cntclick: this.state.cntclick++};

    //row
    for (var i = 0; i < NUM_TILE; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //col
    for (var i = 0; i < NUM_TILE; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }
    //diag
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    //No winners
    return 0;
  };

  onPressTile = (row, col) => {
    if (this.state.gameState[row][col] !== 0) {
      return;
    }
    var currentplayer = this.state.currentplayer;
    var arr = this.state.gameState.slice();

    arr[row][col] = currentplayer;
    this.setState = {gameState: arr};

    this.setState = {currentplayer: this.setState.currentplayer * -1};

    //check for Winner....
    var winner = this.checkWinner();
    if (winner === 1) {
      setTimeout(() => {
        Alert('Player 1 is winner');
      }, 1000);
      this.setState = {cntWinPlayeer1: this.setState.cntWinPlayeer1++};
      this.initializeGame();
    }

    if (winner === -3) {
      setTimeout(() => {
        Alert('Player 2 is winner');
      }, 1000);
      this.setState = {cntWinPlayer2: this.setState.cntWinPlayer2++};
      this.initializeGame();
    }

    if (this.state.cntclick === 9) {
      setTimeout(() => {
        Alert('Standoff');
      }, 1000);
      this.setState = {cntStandoff: this.setState.cntStandoff++};
      this.initializeGame();
    }
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="close" style={styles.tile0} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tileRow}>
          <TouchableOpacity
            onPress={() => this.onPressTile(0, 0)}
            style={styles.tile}>
            this.renderIcon(0, 0)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(0, 1)}
            style={styles.tile}>
            this.renderIcon(0, 1)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(0, 2)}
            style={styles.tile}>
            this.renderIcon(0, 2)
          </TouchableOpacity>
        </View>
        <View style={styles.tileRow}>
          <TouchableOpacity
            onPress={() => this.onPressTile(1, 0)}
            style={styles.tile}>
            this.renderIcon(1, 0)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(1, 1)}
            style={styles.tile}>
            this.renderIcon(1, 1)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(1, 2)}
            style={styles.tile}>
            this.renderIcon(1, 2)
          </TouchableOpacity>
        </View>
        <View style={styles.tileRow}>
          <TouchableOpacity
            onPress={() => this.onPressTile(2, 0)}
            style={styles.tile}>
            this.renderIcon(2, 0)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(2, 1)}
            style={styles.tile}>
            this.renderIcon(2, 1)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onPressTile(2, 2)}
            style={styles.tile}>
            this.renderIcon(2, 2)
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.Create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },
  tileX: {
    fontSize: 60,
    color: '#f00',
  },
  tile0: {
    fontSize: 60,
    color: '#008b00',
  },
});
