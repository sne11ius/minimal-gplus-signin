package nu.wasis.minimalgplussignin;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.UriBuilder;

import org.glassfish.grizzly.http.server.HttpServer;

import com.sun.jersey.api.container.grizzly2.GrizzlyWebContainerFactory;

public class MinimalGPlusSignin {

    // We only want relative urls in the JAX-RS definitions, so put the absolute
    // part here.
    private static final String URL_PREFIX = "mit/minimal-gplus-signin";

    // The base URI used by this application.
    public static final URI BASE_URI = getBaseURI();

    private static int getPort(final int defaultPort) {
        final String httpPort = System.getProperty("jersey.test.port");
        if (null != httpPort) {
            try {
                return Integer.parseInt(httpPort);
            } catch (final NumberFormatException e) {
            }
        }
        return defaultPort;
    }

    private static URI getBaseURI() {
        return UriBuilder.fromUri("http://localhost/" + URL_PREFIX).port(getPort(7654)).build();
    }

    // Init and run Grizzly server
    protected static HttpServer startServer() throws IOException {
        final Map<String, String> initParams = new HashMap<String, String>();
        initParams.put("com.sun.jersey.config.property.packages", "nu.wasis.minimalgplussignin;org.codehaus.jackson.jaxrs");
        initParams.put("com.sun.jersey.api.json.POJOMappingFeature", "true");
        return GrizzlyWebContainerFactory.create(BASE_URI, initParams);
    }

    public static void main(final String[] args) throws IOException {
        final HttpServer httpServer = startServer();
        System.out.println("MinimalGPlusSignin app started\nHit enter to stop...");
        System.in.read();
        httpServer.stop();
    }
}
