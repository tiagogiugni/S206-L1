package harry_potter;

import com.intuit.karate.junit5.Karate;

class NcRunner {
    
    @Karate.Test
    Karate testHp() {
        return Karate.run("harry_potter'").relativeTo(getClass());
    }    

}