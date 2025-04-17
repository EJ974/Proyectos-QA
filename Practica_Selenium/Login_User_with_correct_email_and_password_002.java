package ui;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

import java.time.Duration;


public class Login_User_with_correct_email_and_password_002 {
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
    	   
        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[4]/a")).click();
        
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement textregister = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div.col-sm-4.col-sm-offset-1 > div > h2")));
        Assert.assertTrue("El home page no está visible", textregister.isDisplayed());
        
        String actualText1 = textregister.getText().trim();
        String expectedText1 = "Login to your account";
        Assert.assertEquals("Los textos no coinciden", expectedText1, actualText1);


        driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[1]/div/form/input[2]")).sendKeys("scar97@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[1]/div/form/input[3]")).sendKeys("ScarfaceUltra1234");
        driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[1]/div/form/button")).click();
        
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement enteraccount = wait2.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[10]/a")));
        Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", enteraccount.isDisplayed());
        
        String actualText = enteraccount.getText().trim();
        String expectedText = "Logged in as Sebastian";
        Assert.assertEquals("Los textos no coinciden", expectedText, actualText);
        
        
	     
	     driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[5]/a")).click();
	     
	     
	     
	     WebDriverWait wait3 = new WebDriverWait(driver, Duration.ofSeconds(10));
	        WebElement accountcreated = wait3.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div > h2 > b")));
	        Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", accountcreated.isDisplayed());
    
	        String actualText2 = accountcreated.getText().trim();
	        String expectedText2 = "ACCOUNT DELETED!";
	        Assert.assertEquals("Los textos no coinciden", expectedText2, actualText2);
    
    }

    
}
