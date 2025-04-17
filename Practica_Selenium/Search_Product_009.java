package ui;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

import java.time.Duration;
import java.util.List;


public class Search_Product_009 {
    private WebDriver driver;

    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com");
    }

    @Test
    public void registerTest() throws InterruptedException {
    	WebElement homepage = driver.findElement(By.xpath("//*[@id=\"slider\"]/div/div/div"));
        Assert.assertTrue("El home page no está visible", homepage.isDisplayed());
    	   
        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[2]/a")).click();
        
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement textregister = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("body > section:nth-child(3) > div > div > div.col-sm-9.padding-right > div > h2")));
        Assert.assertTrue("El Texto 'ALL PRODUCTS' no esta visible", textregister.isDisplayed());
        
        String actualText1 = textregister.getText().trim();
        String expectedText1 = "ALL PRODUCTS";
        Assert.assertEquals("Los textos no coinciden", expectedText1, actualText1);
        
        driver.findElement(By.xpath("//*[@id=\"search_product\"]")).sendKeys("polo");
        
        driver.findElement(By.xpath("//*[@id=\"submit_search\"]")).click();
        
        WebElement searchproducts = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/h2"));
        Assert.assertTrue("El elemento 'SEARCHED PRODUCTS' no esta visible", searchproducts.isDisplayed());
        
        try {
           
            WebElement container = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]"));

            
            List<WebElement> elements = container.findElements(By.xpath(".//div/div[2]/div/div[1]/div[1]/p")); 

            JavascriptExecutor js = (JavascriptExecutor) driver; 

            
            for (WebElement element : elements) {
               
                js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", element);

               
                Thread.sleep(500);

                
                String text = element.getText().toLowerCase(); 

                
                if (!text.contains("polo")) {
                    System.out.println("❌ ERROR: Este elemento NO contiene 'shirt': " + text);
                    throw new AssertionError("Test falló: Se encontró un elemento sin 'shirt'");
                }
            }

            System.out.println("✅ Test pasado: Todos los elementos contienen 'shirt'");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            driver.quit(); 
        }
        
        
    
    }

    
}
