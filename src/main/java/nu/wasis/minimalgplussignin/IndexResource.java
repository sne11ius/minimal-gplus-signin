package nu.wasis.minimalgplussignin;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import nu.wasis.minimalgplussignin.util.GPlusUtils;
import nu.wasis.minimalgplussignin.util.PrivateConstants;

import org.apache.log4j.Logger;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

/**
 * Renders the index.ftl file.
 */
@Path("/")
public class IndexResource {

    private static final String STATE_ATTRIBUTE_KEY = "state";

    @SuppressWarnings("unused")
    private static final Logger LOG = Logger.getLogger(IndexResource.class);

    @GET
    @Produces(MediaType.TEXT_HTML)
    public String getIndex(@Context final HttpServletRequest request) throws IOException, TemplateException {
        final HttpSession session = request.getSession(true);
        final String state = new BigInteger(130, new SecureRandom()).toString(32);
        session.setAttribute(STATE_ATTRIBUTE_KEY, state);
        final StringWriter writer = new StringWriter();
        final Template template = getTemplate();
        template.process(createTemplateMap(request, state), writer);
        return writer.toString();
    }

    private Template getTemplate() throws IOException {
        final Configuration configuration = new Configuration();
        final File templateDir = new File("./target/classes");
        configuration.setDirectoryForTemplateLoading(templateDir);
        final Template template = configuration.getTemplate("index.ftl");
        return template;
    }

    private Map<String, Object> createTemplateMap(final HttpServletRequest request, final String state) {
        final Map<String, Object> map = new HashMap<String, Object>();
        map.put("client_id", PrivateConstants.CLIENT_ID);
        map.put(STATE_ATTRIBUTE_KEY, state);
        map.put("username", GPlusUtils.getCurrentUsername(request));
        map.put("loggedin", GPlusUtils.isLoggedIn(request));
        return map;
    }

}
