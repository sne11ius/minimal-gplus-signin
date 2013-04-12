package nu.wasis.minimalgplussignin.service;

import java.util.Collections;
import java.util.List;

import nu.wasis.minimalgplussignin.model.Comment;
import nu.wasis.minimalgplussignin.model.Post;
import nu.wasis.minimalgplussignin.util.Constants;
import nu.wasis.minimalgplussignin.util.MongoUtils;
import nu.wasis.minimalgplussignin.util.PostDateComparator;

import org.apache.log4j.Logger;
import org.bson.types.ObjectId;

import com.github.jmkgreen.morphia.Datastore;
import com.github.jmkgreen.morphia.Morphia;

public class PostService {

    @SuppressWarnings("unused")
    private static final Logger LOG = Logger.getLogger(PostService.class);

    final Datastore ds = new Morphia().createDatastore(MongoUtils.getMongo(), Constants.DB_NAME);

    public static final PostService INSTANCE = new PostService();

    private PostService() {
        // singleton ... sortof ;)
    }

    public List<Post> getPosts() {
        final List<Post> allPosts = ds.find(Post.class).asList();
        // TODO: mongo should do the sorting for us. Btw: isn't a date included in the id?
        Collections.sort(allPosts, new PostDateComparator());
        return allPosts;
    }

    public Post getPost(final String postId) {
        return ds.get(Post.class, new ObjectId(postId));
    }

    public void save(final Post post) {
        ds.save(post);
    }

    public void deletePost(final Post post) {
        ds.delete(post);
    }

    public void deletePost(final ObjectId id) {
        final Post post = new Post();
        post.setId(id);
        ds.delete(post);
    }

    public void addComment(final String postId, final Comment comment) {
        final Post post = getPost(postId);
        post.getComments().add(comment);
        save(post);
    }

    public void deleteComment(final String postId, final String commentId) {
        final Post post = getPost(postId);
        post.removeComment(commentId);
        save(post);
    }

}