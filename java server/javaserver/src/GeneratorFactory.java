import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.TimeZone;

/**
 * Created by Gennady Trubach on 28.03.2015.
 * FAMCS 2d course 5th group
 */
public class GeneratorFactory {
    private static final long LIMIT = 10000000000L;

    public static long generateId() {
        Random random = new Random();
        long currentDate = System.currentTimeMillis();
        return Math.abs(currentDate * random.nextLong() % LIMIT);
    }

    public static String generateUserName() {
        StringBuilder sb = new StringBuilder("user ");
        Random random = new Random(System.currentTimeMillis());
        sb.append(random.nextInt(1000));
        return sb.toString();
    }

    public static String generateCurrentDate() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy, HH:mm:ss");
        dateFormat.setTimeZone(TimeZone.getTimeZone("Europe/Minsk"));
        return dateFormat.format(new Date());
    }
}
