package com.bsu;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GetName extends HttpServlet {
  @Override
  protected void doGet(
      HttpServletRequest request,
      HttpServletResponse response) throws IOException {

    response.getOutputStream().println(
        String.format("%s%s", "Name is ", request.getParameter("name")));
  }
}
