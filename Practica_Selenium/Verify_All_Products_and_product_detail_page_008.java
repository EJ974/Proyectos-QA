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


public class Verify_All_Products_and_product_detail_page_008 {
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
        
        WebElement listproducts = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div"));
        Assert.assertTrue("La lista de productos no esta visible", listproducts.isDisplayed());
        
        
        WebElement fileInput = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div/div[2]/div/div[2]/ul/li/a"));


	     ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", fileInput);
	
	    
	     Thread.sleep(1000);
	

	     fileInput.click();
	     
	     WebElement productsdetail = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div"));
	     Assert.assertTrue("El detalle en general del producto no esta visible", productsdetail.isDisplayed());
	     
	     WebElement productname = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/h2"));
	        Assert.assertTrue("El nombre del producto no está visible", productname.isDisplayed());
	        
	     WebElement productcategory = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[1]"));
	     Assert.assertTrue("La categoria del producto no está visible", productcategory.isDisplayed());
	        
	     WebElement productprice = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/span"));
	     Assert.assertTrue("El precio del producto no está visible", productprice.isDisplayed());
	        
	     WebElement productavailability = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[2]"));
	     Assert.assertTrue("La disponibilidad del producto no está visible", productavailability.isDisplayed());
	        
	     WebElement productcondition = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[3]"));
	     Assert.assertTrue("La condicion del producto no está visible", productcondition.isDisplayed());
	       
	     WebElement productbrand = driver.findElement(By.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[4]"));
	     Assert.assertTrue("La marca del producto no está visible", productbrand.isDisplayed());
        
         driver.close();
        
        
        
    
    }

    
}
