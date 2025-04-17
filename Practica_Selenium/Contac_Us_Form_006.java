package ui;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.Alert;
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


public class Contac_Us_Form_006 {
    private WebDriver driver;

    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com");
    }

    @Test
    public void registerTest() {
	    	WebElement homepage = driver.findElement(By.id("header"));
	        Assert.assertTrue("El home page no está visible", homepage.isDisplayed());
	    	        
	        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[8]/a")).click();
        
	        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement contacmessage = wait2.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"contact-page\"]/div[2]/div[1]/div/h2")));
	        Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", contacmessage.isDisplayed());
	        
	        String actualText = contacmessage.getText().trim();
	        String expectedText = "GET IN TOUCH";
	        Assert.assertEquals("Los textos no coinciden", expectedText, actualText);
        
	        driver.findElement(By.xpath("//*[@id=\"contact-us-form\"]/div[1]/input")).sendKeys("Scar");
	        driver.findElement(By.xpath("//*[@id=\"contact-us-form\"]/div[2]/input")).sendKeys("scar97@gmail.com");
	        driver.findElement(By.xpath("//*[@id=\"contact-us-form\"]/div[3]/input")).sendKeys("Scar");
	        driver.findElement(By.xpath("//*[@id=\"message\"]")).sendKeys("Prueba de mensaje para el caso de prueba de Contact_Us");       
	     
	        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement fileInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id='contact-us-form']/div[5]/input")));
	        fileInput.sendKeys("C:\\Users\\Scarface\\Desktop\\Nueva carpeta\\DOLAR.pdf");
	        
	        driver.findElement(By.xpath("//*[@id=\"contact-us-form\"]/div[6]/input")).click();  

	        Alert alerta = driver.switchTo().alert();
	        alerta.accept();
	             
	     	WebDriverWait wait3 = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement accountcreated = wait3.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#contact-page > div.row > div.col-sm-8 > div > div.status.alert.alert-success")));
	        Assert.assertTrue("El texto de confirmacion al enviar el mensaje no está visible", accountcreated.isDisplayed());
    
	        String actualText2 = accountcreated.getText().trim();
	        String expectedText2 = "Success! Your details have been submitted successfully.";
	        Assert.assertEquals("Los textos no coinciden", expectedText2, actualText2);
	        
	        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[1]/a")).click();
	            
	        WebElement homepage2 = driver.findElement(By.id("header"));
	        Assert.assertTrue("El home page no está visible", homepage2.isDisplayed());
	        
	        driver.close();
    
    }

    
}
