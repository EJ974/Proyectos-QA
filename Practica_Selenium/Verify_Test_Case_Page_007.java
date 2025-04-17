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


public class Verify_Test_Case_Page_007 {
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
    	   
        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[5]/a")).click();
        
        
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement textregister = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div.row > div > h2 > b")));
        Assert.assertTrue("El Texto principal de la seccion Test Cases no está visible", textregister.isDisplayed());
        
        String actualText1 = textregister.getText().trim();
        String expectedText1 = "TEST CASES";
        Assert.assertEquals("Los textos no coinciden", expectedText1, actualText1);
        
        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement enteraccount = wait2.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"form\"]/div/div[2]/h5")));
        Assert.assertTrue("El Texto secundario de la seccion Test Cases no está visible", enteraccount.isDisplayed());
        
        String actualText = enteraccount.getText().trim();
        String expectedText = "Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:";
        Assert.assertEquals("Los textos no coinciden", expectedText, actualText);
        
    
    }

    
}
