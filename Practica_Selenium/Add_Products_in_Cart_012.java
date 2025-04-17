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


public class Add_Products_in_Cart_012 {
    private WebDriver driver;

    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com");
    }

    @Test
    public void productTest() throws InterruptedException {
    	WebElement homepage = driver.findElement(By.xpath("//*[@id=\"slider\"]/div/div/div"));
        Assert.assertTrue("El home page no está visible", homepage.isDisplayed());
    	 
        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[2]/a")).click();
        
        WebElement fileInput = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/a"));


	     ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", fileInput);
	
	    
	     Thread.sleep(1000);
        
        driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[1]/div[1]/a")).click();
        
        Thread.sleep(3000);
        
        driver.findElement(By.xpath("//*[@id=\"cartModal\"]/div/div/div[3]/button")).click();
        
        
        WebElement fileInput2 = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/div[3]/div/div[1]/div[1]/a"));


	     ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", fileInput2);
	
	    
	     Thread.sleep(1000);
        driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/div[3]/div/div[1]/div[1]/a")).click();
        
        Thread.sleep(3000);
        
        driver.findElement(By.xpath("//*[@id=\"cartModal\"]/div/div/div[2]/p[2]/a/u")).click();
        
        WebElement product1 = driver.findElement(By.xpath("//*[@id=\"product-1\"]"));
        Assert.assertTrue("El primer producto no esta visible", product1.isDisplayed());
        
        WebElement product2 = driver.findElement(By.xpath("//*[@id=\"product-2\"]"));
        Assert.assertTrue("El segundo producto no esta visible", product2.isDisplayed());
     
        driver.quit();
    }
    

    
}

