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


public class Verify_Subscription_in_Cart_page_011 {
    private WebDriver driver;

    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com");
    }

    @Test
    public void registerTest() throws InterruptedException, TimeoutException {
    	WebElement homepage = driver.findElement(By.xpath("//*[@id=\"slider\"]/div/div/div"));
        Assert.assertTrue("El home page no está visible", homepage.isDisplayed());
    	   
        driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[3]/a")).click();
        
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        boolean elementFound = false;
        
        while (!elementFound) {
            try {
                
                WebElement textregister = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"footer\"]/div[1]/div/div/div[2]/div/h2")));

               
                js.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", textregister);

                
                Assert.assertTrue("❌ El Texto 'SUBSCRIPTION' no está visible", textregister.isDisplayed());

                String actualText = textregister.getText().trim();
                String expectedText = "SUBSCRIPTION";
                Assert.assertEquals("❌ Los textos no coinciden", expectedText, actualText);

                System.out.println("✅ Verificación de 'SUBSCRIPTION' exitosa");
                elementFound = true; 

            } catch (NoSuchElementException e) {
                js.executeScript("window.scrollBy(0, 400);"); 
                System.out.println("🔍 Elemento no encontrado, haciendo scroll...");
            }

            Thread.sleep(500);
        }

       
        driver.findElement(By.xpath("//*[@id=\"susbscribe_email\"]")).sendKeys("scar97@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"subscribe\"]")).click();

        WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[contains(text(), 'You have been successfully subscribed!')]")));

		Assert.assertTrue("❌ El mensaje de suscripción no está visible", successMessage.isDisplayed());

		String actualSuccessText = successMessage.getText().trim();
		String expectedSuccessText = "You have been successfully subscribed!";
		Assert.assertEquals("❌ El mensaje de suscripción no coincide", expectedSuccessText, actualSuccessText);

		System.out.println("✅ Mensaje de suscripción verificado correctamente.");

        driver.quit(); 
    }
        
}
