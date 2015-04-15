/**
 * Created by Gennady Trubach on 15.04.2015.
 * FAMCS 2d course 5th group
 */
public class HistoryElement {
    private String method;
    private Message message;

    public HistoryElement(String method, Message message) {
        this.method = method;
        this.message = message;
    }

    public String getMethod() {
        return method;
    }

    public Message getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return message.toString();
    }
}
