/**
 * Created by Gennady Trubach on 28.03.2015.
 * FAMCS 2d course 5th group
 */
public class Message {
    private final String ID;
    private String senderName;
    private String messageText;
    private String sendDate;
    private String modifyDate;
    private boolean isDeleted;

    public Message(String ID, String senderName, String messageText, String sendDate, String modifyDate, boolean isDeleted) {
        this.ID = ID;
        this.senderName = senderName;
        this.messageText = messageText;
        this.sendDate = sendDate;
        this.modifyDate = modifyDate;
        this.isDeleted = isDeleted;
    }

    public void modify(String newMessageText) {
        messageText = newMessageText;
        modifyDate = GeneratorFactory.generateCurrentDate();
    }

    public void delete() {
        isDeleted = true;
        messageText = "deleted";
    }

    public String getID() {
        return ID;
    }

    public String getMessageText() {
        return messageText;
    }

    public String getSendDate() {
        return sendDate;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("{\"id\":\"").append(ID)
        .append("\", \"senderName\":\"").append(senderName)
        .append("\", \"messageText\":\"").append(messageText)
        .append("\", \"sendDate\":\"").append(sendDate)
        .append("\", \"modifyDate\":\"").append(modifyDate)
        .append("\", \"isDeleted\":\"").append(isDeleted).append("\"}");
        return sb.toString();
    }

    public String getReadableView() {
        StringBuilder sb = new StringBuilder("Message from ");
        sb.append(senderName)
        .append(" in ")
        .append(getSendDate())
        .append(" : ")
        .append(getMessageText());
        return sb.toString();
    }
}