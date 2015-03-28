/**
 * Created by Gennady Trubach on 28.03.2015.
 * FAMCS 2d course 5th group
 */
public class Message {
    private final String ID;
    private String senderName;
    private String messageText;
    private String date;
    private boolean isDeleted;

    public Message(String ID, String senderName, String messageText, String date, boolean isDeleted) {
        this.ID = ID;
        this.senderName = senderName;
        this.messageText = messageText;
        this.date = date;
        this.isDeleted = isDeleted;
    }

    public void modify(String newMessageText) {

    }

    public void delete() {
        isDeleted = true;
    }

    public String getID() {
        return ID;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"").append(ID)
          .append("\", \"sender\":\"").append(senderName)
          .append("\", \"message\":\"").append(messageText)
          .append("\", \"date\":\"").append(date)
          .append("\", \"deleted\":\"").append(isDeleted).append("\"}");
        return sb.toString();
    }

    public String getReadableView() {
        StringBuilder sb = new StringBuilder("Message from ");
        sb.append(senderName)
          .append(" in ")
          .append(getDate())
          .append(" : ")
          .append(getMessageText());
        return sb.toString();
    }

}
