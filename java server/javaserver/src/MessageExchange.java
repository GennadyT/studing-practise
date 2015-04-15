import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MessageExchange {

    private JSONParser jsonParser = new JSONParser();

    public String getToken(int index) {
        Integer number = index * 8 + 11;
        return "TN" + number + "EN";
    }

    public int getIndex(String token) {
        return (Integer.valueOf(token.substring(2, token.length() - 2)) - 11) / 8;
    }

    public String getServerResponse(List<HistoryElement> messages, int historySize) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("messages", messages);
        jsonObject.put("token", getToken(historySize));
        return jsonObject.toJSONString();
    }

    public Message getClientMessage(InputStream inputStream) throws ParseException {
        JSONObject jsonObject = getJSONObject(inputStreamToString(inputStream));
        return new Message((String) jsonObject.get("id"), (String) jsonObject.get("senderName"),
                (String) jsonObject.get("messageText"), getSendDate(jsonObject), getModifyDate(jsonObject),
                "true".equals(jsonObject.get("isDeleted")));
    }

    public JSONObject getJSONObject(String json) throws ParseException {
        return (JSONObject) jsonParser.parse(json.trim());
    }

    public String getSendDate(JSONObject jsonObject) {
        String date = (String) jsonObject.get("sendDate");
        if (date != null) {
            return date;
        }
        return GeneratorFactory.generateCurrentDate();
    }

    public String getModifyDate(JSONObject jsonObject) {
        String date = (String) jsonObject.get("modifyDate");
        if (date != null) {
            return date;
        }
        return "not modified";
    }

    public String inputStreamToString(InputStream in) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int length = 0;
        try {
            while ((length = in.read(buffer)) != -1) {
                baos.write(buffer, 0, length);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new String(baos.toByteArray());
    }
}
