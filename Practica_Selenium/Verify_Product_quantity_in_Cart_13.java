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
import java.util.NoSuchElementException;
import java.util.concurrent.TimeoutException;


public class Verify_Product_quantity_in_Cart_13 {
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
        
    	 
        
        
        WebElement fileInput = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div[1]/div[2]/div/div[2]/ul/li/a"));


	     ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", fileInput);
	     
	     fileInput.click();
	    
	     Thread.sleep(1000);
        
        driver.findElement(By.xpath("//*[@id=\"quantity\"]")).clear();
        driver.findElement(By.xpath("//*[@id=\"quantity\"]")).sendKeys("4");
        
        driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button")).click();
        
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"cartModal\"]/div/div/div[2]/p[2]/a/u")).click();
        

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        try {
           
        	WebElement quantity = driver.findElement(By.xpath("//*[@id=\"product-1\"]/td[4]/button"));
            int value = extractNumber(quantity.getText());
            
            Assert.assertEquals("❌ El resultado de la cantidad no coincide con el valor esperado.", 4, value);
            System.out.print("La cantidad es :" + value);
        } catch (NoSuchElementException e) {
            System.out.println("❌ No se pudo encontrar el elemento");
        } finally {
             driver.close();
        }
    }

    
    private int extractNumber(String text) {
        String numberStr = text.replaceAll("[^0-9]", "");
        return Integer.parseInt(numberStr);
    }


    
}

