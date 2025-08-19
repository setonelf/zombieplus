// @ts-check
import { test, expect } from '@playwright/test';

const { LandingPage } = require('./pages/LandingPage')

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Thiago Freitas','test@test.com')
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await landingPage.toastHaveText(message)
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Thiago Freitas','test.com')
  await landingPage.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando o nome não e preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('','test@test.com')
  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando o email não e preenchido', async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Thiago Freitas','')
  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando nenhum campo e preechido', async ({ page }) => {
  const landingPage = new LandingPage(page)
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('','')
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});
