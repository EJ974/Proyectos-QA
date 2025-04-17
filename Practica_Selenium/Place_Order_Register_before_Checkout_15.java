package ui;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.common.io.Files;

import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.concurrent.TimeoutException;
import java.util.logging.FileHandler;


public class Place_Order_Register_before_Checkout_15 {
    private WebDriver driver;

    @Before
    public void setUp() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://automationexercise.com");
    }

    @Test
    public void place_order() throws InterruptedException {
    	 WebElement homepage = driver.findElement(By.id("header"));
         Assert.assertTrue("El home page no está visible", homepage.isDisplayed());
    	 
         WebElement signup_login_button = driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[4]/a"));
         signup_login_button.click();
         
         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/input[2]")).sendKeys("Felipe");
         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/input[3]")).sendKeys("felipe97@gmail.com");
         driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div[3]/div/form/button")).click();
        
         driver.findElement(By.xpath("//*[@id=\"id_gender1\"]")).click();
        
         driver.findElement(By.xpath("//*[@id=\"name\"]")).clear();
         driver.findElement(By.xpath("//*[@id=\"name\"]")).sendKeys("Felipee");
        
        
         driver.findElement(By.id("password")).sendKeys("FelipeUltra1234");
        
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
	     
	     driver.findElement(By.id("first_name")).sendKeys("Felipe");
	     driver.findElement(By.id("last_name")).sendKeys("Gomez"); 
	     driver.findElement(By.id("company")).sendKeys("Candy Shop");
	     driver.findElement(By.id("address1")).sendKeys("Adress");
	     driver.findElement(By.id("address2")).sendKeys("Adress2");
	     
	     WebElement countryDropdown = driver.findElement(By.xpath("//*[@id=\"country\"]"));
	     Select selectCountry = new Select(countryDropdown);
	     selectCountry.selectByValue("United States");
	     
	     driver.findElement(By.id("state")).sendKeys("StateEjemplo");
	     driver.findElement(By.id("city")).sendKeys("CityEjemplo");
	     driver.findElement(By.id("zipcode")).sendKeys("1234");
	     driver.findElement(By.id("mobile_number")).sendKeys("3794774419");
	     
	     driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div/div/form/button")).click();
	     
	     WebDriverWait wait_account = new WebDriverWait(driver, Duration.ofSeconds(10));
	     WebElement accountcreated = wait_account.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div > h2 > b")));
	     Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", accountcreated.isDisplayed());
    
	     String actualText_account = accountcreated.getText().trim();
	     String expectedText_account = "ACCOUNT CREATED!";
	     Assert.assertEquals("Los textos no coinciden", expectedText_account, actualText_account);
	     
	     WebElement continue_button = driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div/div/a"));
	     continue_button.click();
	     
	     WebDriverWait wait_username = new WebDriverWait(driver, Duration.ofSeconds(10));
	     WebElement enteraccount_user = wait_username.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[10]/a")));
	     Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", enteraccount_user.isDisplayed());

	     String actualText_username = enteraccount_user.getText().trim();
	     String expectedText_username = "Logged in as Felipee";
	     Assert.assertEquals("Los textos no coinciden", expectedText_username, actualText_username);
         
         
         JavascriptExecutor js = (JavascriptExecutor) driver;
         js.executeScript("window.scrollBy(0, 500)");
	     
	     
	     WebElement addproduct = driver.findElement(By.xpath("/html/body/section[2]/div/div/div[2]/div[1]/div[2]/div/div[1]/div[1]/a"));
	     addproduct.click();
	     Thread.sleep(1000);
	     
	     WebElement continue_product = driver.findElement(By.xpath("//*[@id=\"cartModal\"]/div/div/div[3]/button"));
	     continue_product.click();
	     
	     WebElement cart = driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[3]/a"));
	     ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", cart); 
	     cart.click();
	     Thread.sleep(1000);
	     
	     
	     WebElement cart_section = driver.findElement(By.xpath("//*[@id=\"cart_items\"]/div"));
	     cart_section.isDisplayed();
	     
	     WebElement proceed_checkout =driver.findElement(By.xpath("//*[@id=\"do_action\"]/div[1]/div/div/a"));
	     proceed_checkout.click();
	     
	     WebElement delivery_address = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]"));
	     delivery_address.isDisplayed();
	     
	     WebElement billing_address = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]"));
	     billing_address.isDisplayed();
	     
	     WebElement name_verify = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[2]")); 
		 String	text_name = name_verify.getText();
	     String expect_name = "Mr. Felipe Gomez";
	     Assert.assertEquals("Los textos no coinciden", expect_name, text_name);
	     
	     WebElement company_name = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[3]"));
         String text_company = company_name.getText();
         String expect_company = "Candy Shop";
         Assert.assertEquals("Los textos no coinciden", expect_company, text_company);
         
         WebElement address1 = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[4]"));
         String text_address1 = address1.getText();
         String expect_address1 = "Adress";
         Assert.assertEquals("Los textos no coinciden", expect_address1, text_address1);
         
         WebElement address2 = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[5]"));
         String text_address2 = address2.getText();
         String expect_address2 = "Adress2";
         Assert.assertEquals("Los textos no coinciden", expect_address2, text_address2);
         
         WebElement addresscsp = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[6]"));
         String text_addresscsp = addresscsp.getText();
         String expect_addresscsp = "CityEjemplo StateEjemplo 1234";
         Assert.assertEquals("Los textos no coinciden", expect_addresscsp, text_addresscsp);
         
         WebElement address_country = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[7]"));
         String text_address_country = address_country.getText();
         String expect_address_country = "United States";
         Assert.assertEquals("Los textos no coinciden", expect_address_country, text_address_country);
         
         
         WebElement address_phone = driver.findElement(By.xpath("//*[@id=\"address_delivery\"]/li[8]"));
         String text_phone = address_phone.getText();
         String expect_address_phone = "3794774419";
         Assert.assertEquals("Los textos no coinciden", expect_address_phone, text_phone);
	     
         
         
         WebElement billing_name_verify = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[2]")); 
    	 String	billing_text_name = billing_name_verify.getText();
         String billing_expect_name = "Mr. Felipe Gomez";
         Assert.assertEquals("Los textos no coinciden", billing_expect_name, billing_text_name);
             
         WebElement billing_company_name = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[3]"));
         String billing_text_company = billing_company_name.getText();
         String billing_expect_company = "Candy Shop";
         Assert.assertEquals("Los textos no coinciden", billing_expect_company, billing_text_company);
             
         WebElement billing_address1 = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[4]"));
         String billing_text_address1 = billing_address1.getText();
         String billing_expect_address1 = "Adress";
         Assert.assertEquals("Los textos no coinciden", billing_expect_address1, billing_text_address1);
             
         WebElement billing_address2 = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[5]"));
         String billing_text_address2 = billing_address2.getText();
         String billing_expect_address2 = "Adress2";
         Assert.assertEquals("Los textos no coinciden", expect_address2, text_address2);
             
         WebElement billing_addresscsp = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[6]"));
         String billing_text_addresscsp = billing_addresscsp.getText();
         String billing_expect_addresscsp = "CityEjemplo StateEjemplo 1234";
         Assert.assertEquals("Los textos no coinciden", billing_expect_addresscsp, billing_text_addresscsp);
             
         WebElement billing_address_country = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[7]"));
         String billing_text_address_country = billing_address_country.getText();
         String billing_expect_address_country = "United States";
         Assert.assertEquals("Los textos no coinciden", billing_expect_address_country, billing_text_address_country);
             
             
         WebElement billing_address_phone = driver.findElement(By.xpath("//*[@id=\"address_invoice\"]/li[8]"));
         String billing_text_phone = billing_address_phone.getText();
         String billing_expect_address_phone = "3794774419";
         Assert.assertEquals("Los textos no coinciden", billing_expect_address_phone, billing_text_phone);
	     
         
         WebElement caja_comentario = driver.findElement(By.xpath("//*[@id=\"ordermsg\"]/textarea"));
         caja_comentario.sendKeys("Prueba de caja de Comentario");
         
         WebElement placeorder_button = driver.findElement(By.xpath("//*[@id=\"cart_items\"]/div/div[7]/a"));
         placeorder_button.click();
         
         WebElement name_card = driver.findElement(By.xpath("//*[@id=\"payment-form\"]/div[1]/div/input"));
         name_card.sendKeys("nombre de tarjeta");
         
         WebElement card_number = driver.findElement(By.xpath("//*[@id=\"payment-form\"]/div[2]/div/input"));
         card_number.sendKeys("12345678910");
         
         WebElement cvc = driver.findElement(By.xpath("//*[@id=\"payment-form\"]/div[3]/div[1]/input"));
         cvc.sendKeys("311");
         
         WebElement expiration_month = driver.findElement(By.xpath("//*[@id=\"payment-form\"]/div[3]/div[2]/input"));
         expiration_month.sendKeys("04");
         
         WebElement expiration_year = driver.findElement(By.xpath("//*[@id=\"payment-form\"]/div[3]/div[3]/input"));
         expiration_year.sendKeys("2026");
         
         WebElement pay_confirm_button = driver.findElement(By.xpath("//*[@id=\"submit\"]"));
         pay_confirm_button.click();

         Thread.sleep(2000); // o usar WebDriverWait si es más seguro en tu flujo

      // Volver hacia atrás en el navegador
	      driver.navigate().back();
	
	      // Esperar al mensaje de confirmación (alerta)
	      WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
	      WebElement mensaje = wait.until(
	          ExpectedConditions.presenceOfElementLocated(By.cssSelector("#success_message div"))
	      );
	
	      // Esperar que el texto no esté vacío
	      wait.until(d -> !mensaje.getText().trim().isEmpty());
	
	      String text_message_confirm = mensaje.getText().trim();
	      System.out.println("Texto real: " + text_message_confirm);
	
	      String expected_message_confirm = "Your order has been placed successfully!";
	      Assert.assertTrue("El mensaje no contiene el texto esperado", text_message_confirm.contains(expected_message_confirm));
	      
	      Thread.sleep(2000);
	      
	      driver.navigate().forward();
	      
	      WebElement delete_button = driver.findElement(By.xpath("//*[@id=\"header\"]/div/div/div/div[2]/div/ul/li[5]"));
	      delete_button.click();
	      
	      WebDriverWait wait_delete = new WebDriverWait(driver, Duration.ofSeconds(10));
		  WebElement accountdelete = wait_delete.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("#form > div > div > div > h2 > b")));
		  Assert.assertTrue("El texto de al entrar en la cuenta page no está visible", accountdelete.isDisplayed());
	    
		  String text_message_deleted = accountdelete.getText().trim();
	      System.out.println("Texto real: " + text_message_deleted);
		  
		  String actualText_delete = accountdelete.getText().trim();
		  String expectedText_delete = "ACCOUNT DELETED!";
		  Assert.assertEquals("Los textos no coinciden", expectedText_delete, actualText_delete);
	     
		  WebElement continue_deleted_button = driver.findElement(By.xpath("//*[@id=\"form\"]/div/div/div/div/a"));
		  continue_deleted_button.click();

    }

    
}
