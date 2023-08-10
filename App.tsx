import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Error from "./src/components/Error";
import Loading from "./src/components/Loading";
import { useAlmbu } from "./src/hooks/album";
import { useAlmbus } from "./src/hooks/albums";

const screenDimentions = Dimensions.get("screen");
const screenWidth = screenDimentions.width;
const screenHeight = screenDimentions.height;

export default function App() {
  const { albums, error, loading } = useAlmbus();
  const {
    album,
    error: albumError,
    getAlbum,
    loading: albumLoading,
  } = useAlmbu();

  return (
    <View>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {albums.length > 1 && (
        <View>
          <FlatList
            numColumns={2}
            data={albums}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => getAlbum(item.id)}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.image,
                      width: screenWidth / 2 - 16,
                      height: screenWidth / 2 - 16,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      {album && (
        <Modal>
          {albumLoading && <Loading />}
          {albumError && <Error message={albumError} />}
          <View style={styles.albumContainer}>
            {album.image && (
              <Image
                style={styles.image}
                source={{
                  uri: album.image,
                  width: 100,
                  height: 100,
                }}
              />
            )}
            <Text style={styles.albumContainerTitle}>{album.name}</Text>
            <Text>{album.artist}</Text>
            <Text>{album.year}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 8,
    borderRadius: 16,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: "gray",
  },
  image: {
    borderRadius: 16,
  },
  modal: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
  },
  albumContainer: {
    height: screenHeight * 0.8,
    width: screenWidth * 0.8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: "gray",
  },
  albumContainerTitle: {
    fontSize: 16,

    width: "80%",
  },
});
