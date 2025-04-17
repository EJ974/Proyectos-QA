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


public class RegisterUser_001 {
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
         WebElement textregister = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div:nth-child(3) > div > h2")));
         Assert.assertTrue("El home page no está visible", textregister.isDisplayed());
        
         String actualText1 = textregister.getText().trim();
         String expectedText1 = "New User Signup!";
         Assert.assertEquals("Los textos no coinciden", expectedText1, actualText1);


         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/input[2]")).sendKeys("Scar");
         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/input[3]")).sendKeys("scar97@gmail.com");
         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/button")).click();
         
         WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
         WebElement enteraccount = wait2.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div > div > h2 > b")));
         Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", enteraccount.isDisplayed());
        
         String actualText = enteraccount.getText().trim();
         String expectedText = "ENTER ACCOUNT INFORMATION";
         Assert.assertEquals("Los textos no coinciden", expectedText, actualText);
        
         driver.findElement(By.xpath("//*[@id=\"id_gender1\"]")).click();
        
         driver.findElement(By.xpath("//*[@id=\"name\"]")).clear();
         driver.findElement(By.xpath("//*[@id=\"name\"]")).sendKeys("Sebastian");
        
        
         driver.findElement(By.id("password")).sendKeys("ScarfaceUltra1234");
        
         WebElement daysDropdown = driver.findElement(By.xpath("//*[@id='days']"));
	     // Crear objeto Select y seleccionar el valor "4"
	     Select selectDays = new Select(daysDropdown);
	     selectDays.selectByValue("24");  // Selecciona el valor "4"
	     
	     WebElement monthDropdown = driver.findElement(By.xpath("//*[@id=\"months\"]"));
	     Select selectMonth = new Select(monthDropdown);
	     selectMonth.selectByValue("4");
	     
	     WebElement yearDropdown = driver.findElement(By.xpath("//*[@id=\"years\"]"));
	     Select selectYears = new Select(yearDropdown);
	     selectYears.selectByValue("1997");
	     
	     driver.findElement(By.xpath("//*[@id=\"newsletter\"]")).click();
	     driver.findElement(By.xpath("//*[@id=\"optin\"]")).click();
	     
	     driver.findElement(By.id("first_name")).sendKeys("Esteban");
	     driver.findElement(By.id("last_name")).sendKeys("Gauna"); 
	     driver.findElement(By.id("company")).sendKeys("Gun Shop");
	     driver.findElement(By.id("address1")).sendKeys("Adress");
	     driver.findElement(By.id("address2")).sendKeys("Adress2");
	     
	     WebElement countryDropdown = driver.findElement(By.xpath("//*[@id=\"country\"]"));
	     Select selectCountry = new Select(countryDropdown);
	     selectCountry.selectByValue("United States");
	     
	     driver.findElement(By.id("state")).sendKeys("StateEjemplo");
	     driver.findElement(By.id("city")).sendKeys("CityEjemplo");
	     driver.findElement(By.id("zipcode")).sendKeys("1234");
	     driver.findElement(By.id("mobile_number")).sendKeys("3794774418");
	     
	     driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div/div/form/button")).click();
	     
	     WebDriverWait wait3 = new WebDriverWait(driver, Duration.ofSeconds(10));
	     WebElement accountcreated = wait3.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div > h2 > b")));
	     Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", accountcreated.isDisplayed());
    
	     String actualText2 = accountcreated.getText().trim();
	     String expectedText2 = "ACCOUNT CREATED!";
	     Assert.assertEquals("Los textos no coinciden", expectedText2, actualText2);
    
    }

    
}
