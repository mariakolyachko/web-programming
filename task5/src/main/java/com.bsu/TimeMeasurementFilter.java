package com.bsu;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class TimeMeasurementFilter implements javax.servlet.Filter {
  @Override
  public void init(FilterConfig filterConfig) {
  }

  @Override
  public void doFilter(
      ServletRequest servletRequest,
      ServletResponse servletResponse,
      FilterChain filterChain) throws IOException, ServletException {
    var start = System.currentTimeMillis();
    filterChain.doFilter(servletRequest, servletResponse);
    var end = System.currentTimeMillis();

    var httpRequest = (HttpServletRequest) servletRequest;
    String path = httpRequest.getRequestURI();
    String method = httpRequest.getMethod();

    servletResponse.getOutputStream().println(
        String.format("%s - %s - %d ms", method, path, end - start)
    );
  }

  @Override
  public void destroy() {

  }
}
