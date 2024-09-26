import { View, Text, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState, useEffect} from 'react'
import EmptyState from '../../components/EmptyState'

const Bookmarks = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className="bg-background h-full">
      <Text
        className="text-primary text-center"
        style={{ fontFamily: "Pacifico-Regular", fontSize: "30" }}
      >
        Glow
      </Text>
      <Text
        className="text-text text-2xl"
        style={{ fontFamily: "PlayfairDisplay-Bold" }}
      >
        Saved Posts
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <PostCard
            postId={item._id}
            username={item.author.username}
            textContent={item.textContent}
            avatar={item.author.avatar}
            postPhoto={item.postPhoto}
            createdAt={item.createdAt}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Under Construction"
            subtitle="I'm working on it!"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default Bookmarks